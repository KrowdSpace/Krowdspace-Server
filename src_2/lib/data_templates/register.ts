import {DataResponse, dataman_extras} from '@otter-co/ottlib';

export class ContactUsGetter extends dataman_extras.MySQLDataGetter
{
    public serviceName: string = "contact_us_getter";
    table: string = "contact_us";

    public add(data: any): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            let {fname, lname, email, comment} = this.escape(data);            
            this.insert({fname, lname, email, comment}, (err, res, f)=>
            {
                if(!err)
                    resolve({success: true, data: {res, f}} as DataResponse);
                else
                    reject({success: false, data: err} as DataResponse);
            });
        });
    }
}

export class EmailListGetter extends dataman_extras.MySQLDataGetter 
{
    public serviceName: string = "email_list_getter";
    table: string = "email_list";

    public add(data: any): Promise<DataResponse>
    {
        return new Promise((reject, resolve)=>
        {
            let {
                fname,
                lname,
                email,
                ksuser,
                iguser,
                pvalid,
                vcode
            } = this.escape(data);

            this.insert({fname, lname, email, ksuser, iguser, pvalid, verify_code: vcode}, (err, res, f)=>
            {
                if(!err)
                    resolve({success: true});
                else
                    reject({success:false, data: err});
            });
        });
    }

    public get(data: any): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            let {email} = this.escape(data);
            this.select("*", {email}, void 0, (err, res, f)=>
            {
                if(!err)
                    resolve({success: true, data: res});
                else
                    reject({success: false, data: err});
            });
        });
    }
}

export default [
    ContactUsGetter,
    EmailListGetter,
];