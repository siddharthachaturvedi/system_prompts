@@ .. @@
   const onSubmit = async (data: RegisterForm) => {
     try {
       const result = await register({
         name: data.name,
         email: data.email,
         password: data.password,
       }).unwrap();
       
       if (result.success) {
         dispatch(loginSuccess({
           user: result.data.user,
           token: result.data.token,
         }));
         
         dispatch(addNotification({
           type: 'success',
           title: 'Account created!',
           message: 'Welcome to LLM Manager. Your account has been created successfully.',
         }));

         navigate('/', { replace: true });
       }
-    } catch (error: any) {
+    } catch (error: any) {
       dispatch(addNotification({
         type: 'error',
         title: 'Registration failed',
-        message: error.data?.message || 'Please try again.',
+        message: error?.data?.message || 'Please try again.',
       }));
     }
   };