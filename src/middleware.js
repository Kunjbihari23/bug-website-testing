export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/add-property',
    '/edit-property',
    '/UserDashboard/UserProfile',
    '/UserDashboard',
    '/Client/Inquery',
    '/Client/UserProperty',
    '/Client/UserFavoriteProperty',
    '/Client/BoosterPropertyList',
  ],
};
