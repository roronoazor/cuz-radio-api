export const UserRole = {
  ADMIN: 'ADMIN',
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

// Admin and Primary
export type AdminAndPrimaryRoleType = Extract<UserRoleType, typeof UserRole.ADMIN | typeof UserRole.PRIMARY>;
export const ADMIN_AND_PRIMARY_ROLES = [UserRole.ADMIN, UserRole.PRIMARY] as const;

// Admin and Secondary
export type AdminAndSecondaryRoleType = Extract<UserRoleType, typeof UserRole.ADMIN | typeof UserRole.SECONDARY>;
export const ADMIN_AND_SECONDARY_ROLES = [UserRole.ADMIN, UserRole.SECONDARY] as const;