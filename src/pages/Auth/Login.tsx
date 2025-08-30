@@ .. @@
   const onSubmit = async (data: LoginForm) => {
     try {
       const result = await login(data).unwrap();
       
       if (result.success) {
         dispatch(loginSuccess({
           user: result.data.user,
           token: result.data.token,
         }));
         
         dispatch(addNotification({
           type: 'success',
           title: 'Welcome back!',
           message: 'You have successfully logged in.',
         }));

         const from = location.state?.from?.pathname || '/';
         navigate(from, { replace: true });
       }
-    } catch (error: any) {
+    } catch (error: any) {
       dispatch(addNotification({
         type: 'error',
         title: 'Login failed',
-        message: error.data?.message || 'Please check your credentials and try again.',
+        message: error?.data?.message || 'Please check your credentials and try again.',
       }));
     }
   };

export default onSubmit