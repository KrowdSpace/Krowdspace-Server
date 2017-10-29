/**
 * data_templates/users.ts
 * 
 * Contains the DataGetter for Adding/Getting Users from the DB.
 */
import {DataResponse, extras} from '@otter-co/ottlib';

export interface UserObj 
{
    username: String,
    unique_id: String, 
    email: String,
    pass_hash: String, 
    user_data: any,
    verified: false,
    verify_code: string,
    forget_code: string,
    level: Number
};

export class UsersGetter extends extras.mongodb_extra.MongoDBDataGetter
{
    public serviceName: string = "users_getter";
    table: string = "users";

    public add(data: any): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            this.insert(this.escape(data), (err, res, f)=>
            {
                if(!err)
                    resolve(<DataResponse> {success: true});
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
    public set(id: any, data: any): Promise<DataResponse>
    {
        return new Promise((reject, resolve)=>
        {
            id = this.escape(id);
            data = this.escape(data);

            this.update(data, id, void 0, (err, res, f)=>
            {
                if(!err)
                    resolve(<DataResponse> {success: true, data: res});
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
    public get(data: UserGet): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            data = this.escape(data);

            this.select(false, data, " OR ", (err, res, f)=>
            {
                if(!err)
                    res.toArray((err, docs:UserObj[])=>
                    {
                        resolve(<DataResponse> {success: true, data: docs});
                    });
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
}

export class SessionsGetter extends extras.mongodb_extra.MongoDBDataGetter
{
    public serviceName: string = "sessions_getter";
    table: string = "sessions";

    public add(data: any): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            this.insert(this.escape(data), (err, res, f)=>
            {
                if(!err)
                    resolve(<DataResponse> {success: true});
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
    public get(data: any): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            data = this.escape(data);

            this.select(false, data, " OR ", (err, res, f)=>
            {
                if(!err)
                    res.toArray((err, docs)=>
                    {
                        resolve(<DataResponse> {success: true, data: <UserGet[]> docs});
                    });
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
    public set(id: any, data: any): Promise<DataResponse>
    {
        return new Promise((reject, resolve)=>
        {
            id = this.escape(id);
            data = this.escape(data);

            this.update(data, id, undefined, (err, res, f)=>
            {
                if(!err)
                    resolve(<DataResponse> {success: true, data: res});
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
    public rid(data: any): Promise<DataResponse>
    {
        return new Promise((resolve, reject)=>
        {
            data = this.escape(data);

            this.delete(data, (err, res, f)=>
            {
                if(!err)
                    resolve(<DataResponse> {success: true});
                else
                    reject(<DataResponse> {success: false, data: err});
            });
        });
    }
}

export interface UserGet
{
    username?:string;
    email?:string;
}

export default [
    UsersGetter,
    SessionsGetter,
];