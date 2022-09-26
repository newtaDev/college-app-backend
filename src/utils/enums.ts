// User UserTypes
export enum UserType {
  teacher = 'TEACHER',
  student = 'STUDENT',

  staff = 'STAFF',
  principal = 'PRINCIPAL',

  admin = 'ADMIN',
  superAdmin = 'SUPER-ADMIN',
}

export enum Week {
  monday = 'MON',
  tuesday = 'TUE',
  wednesday = 'WED',
  thursday = 'THU',
  friday = 'FRI',
  saturday = 'SAT',
  sunday = 'SUN',
}

export enum AnounceTo {
  all = 'ALL',
  teachers = 'TEACHERS',
  staffs = 'STAFFS',
  students = 'STUDENTS',
  classes = 'CLASSES',
}
export enum AnouncementLayoutType {
  imageWithText = 'IMAGE_WITH_TEXT',
  multiImageWithText = 'MULTI_IMAGE_WITH_TEXT',
  onlyText = 'ONLY_TEXT',
}
