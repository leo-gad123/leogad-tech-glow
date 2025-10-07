-- Allow admin to delete messages
CREATE POLICY "Admin can delete messages" 
ON public.messages 
FOR DELETE 
USING (is_admin_user());