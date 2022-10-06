import React, { useEffect, useState } from 'react'
const CSVToJSON = require("csvtojson")
import useSWR from 'swr'
const res = require('request')


CSVToJSON()
.fromStream(req.get('https://irqserdsvujcsqwnmndt.supabase.co/storage/v1/object/public/avatars/1664435228485_datalog.cvs?t=2022-10-03T07%3A12%3A59.501Z'))
.subscribe((json)=>{
    return new Promise((resolve,reject)=>{
      console.log('insodifj')
        // long operation for each json e.g. transform / write into database.
    })
},onError,onComplete)