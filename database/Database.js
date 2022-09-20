import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irqserdsvujcsqwnmndt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycXNlcmRzdnVqY3Nxd25tbmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM0OTQ3NjMsImV4cCI6MTk3OTA3MDc2M30.t6DwP1c3MO2UiKtEDzACYskkjTLdFenggngLIMIjQ7s'
export const supabase = createClient(supabaseUrl, supabaseKey)