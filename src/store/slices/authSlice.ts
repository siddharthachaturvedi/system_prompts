@@ .. @@
export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
     loginStart: (state) => {
       state.isLoading = true;
       state.error = null;
     },
     loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
       state.isLoading = false;
       state.user = action.payload.user;
       state.token = action.payload.token;
       state.isAuthenticated = true;
       state.error = null;
       localStorage.setItem('token', action.payload.token);
     },
     loginFailure: (state, action: PayloadAction<string>) => {
       state.isLoading = false;
       state.error = action.payload;
       state.isAuthenticated = false;
     },
+    refreshTokenStart: (state) => {
+      state.isLoading = true;
+    },
+    refreshTokenSuccess: (state, action: PayloadAction<string>) => {
+      state.token = action.payload;
+      state.isAuthenticated = true;
+      state.isLoading = false;
+      state.error = null;
+      localStorage.setItem('token', action.payload);
+    },
+    refreshTokenFailure: (state) => {
+      state.user = null;
+      state.token = null;
+      state.isAuthenticated = false;
+      state.isLoading = false;
+      localStorage.removeItem('token');
+    },
+    initializeAuth: (state) => {
+      const token = localStorage.getItem('token');
+      if (token) {
+        state.token = token;
+        state.isAuthenticated = true;
+      }
+    },
     logout: (state) => {
       state.user = null;
       state.token = null;
       state.isAuthenticated = false;
       state.error = null;
       localStorage.removeItem('token');
     },
     clearError: (state) => {
       state.error = null;
     },
     updateUser: (state, action: PayloadAction<Partial<User>>) => {
       if (state.user) {
         state.user = { ...state.user, ...action.payload };
       }
     },
   },
 });

 export const {
   loginStart,
   loginSuccess,
   loginFailure,
+  refreshTokenStart,
+  refreshTokenSuccess,
+  refreshTokenFailure,
+  initializeAuth,
   logout,
   clearError,
   updateUser,
 } = authSlice.actions;