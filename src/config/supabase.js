import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vgyabqbmncoucwakrymj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZneWFicWJtbmNvdWN3YWtyeW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTczMTEsImV4cCI6MjA2MjI5MzMxMX0.1_dcm1NiHBfozYh92wJ4DA9zyV84CRms1F3zx-Mn4_s'
export const supabase= createClient(supabaseUrl, supabaseKey)
