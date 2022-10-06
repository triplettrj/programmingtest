// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const CSVToJSON = require("csvtojson")
const res=require('request')

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export default function cvsHandler(req, res) {
  CSVToJSON()
  .fromStream(req.get('https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1664435228485_datalog.cvs?t=2022-10-03T07%3A12%3A59.501Z'))
  .subscribe((json)=>{
      return new Promise((resolve,reject)=>{
        console.log('insodifj')
          // long operation for each json e.g. transform / write into database.
      })
  },onError,onComplete)
}
