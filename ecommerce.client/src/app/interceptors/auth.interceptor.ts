import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | undefined = undefined;

  const userFromStorage = localStorage.getItem('user');
  if (userFromStorage !== null) {
    const user = JSON.parse(userFromStorage);
    if (user.token !== undefined) {
      token = user.token;
    }
  }

  const skipUrls = ['/api/Auth/validate-token'];

  // Check if the current URL matches any of the skip URLs
  if (skipUrls.some((url) => req.url.includes(url))) {
    // Skip the interceptor for this request
    return next(req);
  } else {
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });

      return next(authReq);
    } else {
      return next(req);
    }
  }
};
