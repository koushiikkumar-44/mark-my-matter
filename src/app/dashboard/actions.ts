'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addMatter(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const practice_area = formData.get('practice_area') as string
  const deal_value_str = formData.get('deal_value') as string
  const deal_value = deal_value_str ? parseFloat(deal_value_str.replace(/,/g, '')) : 0

  const { error } = await supabase
    .from('matters')
    .insert([{ title, practice_area, deal_value }])

  if (error) {
    console.error('Error adding matter:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/matters')
  return { success: true }
}

export async function addSubmission(formData: FormData) {
  const supabase = await createClient()
  
  const directory_name = formData.get('directory_name') as string
  const matter_id = formData.get('matter_id') as string // optional
  const deadline = formData.get('deadline') as string
  
  const payload: any = { directory_name, deadline, status: 'Not Started', progress: 0 }
  if (matter_id && matter_id !== 'none') {
    payload.matter_id = matter_id
  }

  const { error } = await supabase
    .from('submissions')
    .insert([payload])

  if (error) {
    console.error('Error adding submission:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/submissions')
  return { success: true }
}

export async function updateSubmissionStatus(id: string, status: string, progress: number) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('submissions')
    .update({ status, progress })
    .eq('id', id)

  if (error) {
    console.error('Error updating submission:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/submissions')
  return { success: true }
}
