import sqlite3  from "sqlite3"

const DATABASE = process.env.DATABASE_FILE

if(!DATABASE) throw new Error("DATABASE_FILE não encontrado")

export const  openConection = () => {
    let db = new sqlite3.Database(DATABASE)
    return db
}

export const dbQueryFirst = async (query: string, param?: any[]) => {
    const response = await dbQuery(query, param)
    return response[0]
}

export const dbQuery = (query: string, param?: any[]) => {
    let db = openConection()

    return new Promise<any[]>((resolve, reject) => {
        db.all(query, param, (err, rows)=> {
            if(err) 
                reject(err)
            else 
                resolve(rows)
        })
    })
    .finally(() => {
        db.close()
    })

}