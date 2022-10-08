import { Types } from 'mongoose';
import { UserType, Week } from '../../../utils/enums';
import { I_Attendance } from '../../attendance/attendance.model';
import { I_Class } from '../../class/class.model';
import { I_College } from '../../college/college.model';
import { I_Course } from '../../course/course.model';
import { I_Subject } from '../../subject/subject.model';
import { I_ClassTimeTable } from '../../time_table/class_time_table/class_time_table.model';
import { I_Faculty } from '../../user/faculty.model';
import { I_Student } from '../../user/student/student.model';
import { I_Teacher } from '../../user/teacher/teacher.model';
import { collegeIds } from './ids';

export const importData = collegeIds.map((college, collegeIndex) => {
  const randomCourses = college.courses.sort(() => 0.5 - Math.random());

  return {
    data: {
      _id: college._id,
      name: `College Name ${collegeIndex}`,
      email: `college${collegeIndex}@gmail.com`,
      mobile: 9876543450 + collegeIndex,
      website: `www.college${collegeIndex}.com`,
      address: `Addres of the college ${collegeIndex} will be here`,
      description: `description of the college ${collegeIndex} wwill be here`,
      isTestData: true,
    } as I_College & { _id: Types.ObjectId },
    courseData: college.courses.map((course, courseIndex) => ({
      data: {
        _id: course._id,
        name: course.name,
        collegeId: college._id,
        totalSem: 4 + courseIndex,
        isTestData: true,
      } as I_Course & { _id: Types.ObjectId },
      classData: course.classes.map((classes, classIndex) => ({
        data: {
          _id: classes._id,
          name: classes.name,
          collegeId: college._id,
          courseId: course._id,
          assignedToId: college.teachers?.at(classIndex % 2 == 0 ? 0 : 1),
          batch: 2010 + classIndex,
          classNumber: 120 + classIndex,
          currentSem: 1,
          isCollegeCompleted: false,
          isTestData: true,
        } as I_Class & { _id: Types.ObjectId },
        subjects: classes.subjects.ids.map((subjectId, subjectIndex) => ({
          _id: subjectId,
          collegeId: college._id,
          courseId: course._id,
          isMainSubject: subjectIndex % 3 == 0 ? false : true,
          name: classes.subjects.names[subjectIndex],
          isTestData: true,
          classId: classes._id,
        })) as (I_Subject & { _id: Types.ObjectId })[],
        students: classes.students.ids.map((studentId, studentIndex) => ({
          _id: studentId,
          name: classes.students.names[studentIndex],
          email: `college${collegeIndex}${courseIndex}${classIndex}.student${studentIndex}@gmail.com`,
          password: 'Newta1234',
          collegeId: college._id,
          userType: UserType.student,
          classId: classes._id,
          dob: new Date(`08-02-2${String(studentIndex).padStart(3, '0')}`),
          myOptionalSubjects: [],
          isTestData: true,
        })) as (I_Student & { _id: Types.ObjectId })[],
        attendance: classes.attendances.map(
          (attendanceId, attendanceIndex) => ({
            _id: attendanceId,
            classId: classes._id,
            collegeId: college._id,
            subjectId: classes.subjects.ids.at(
              attendanceIndex % 2 == 0 ? 0 : 1
            ),
            classStartTime: `${String(attendanceIndex).padStart(2, '0')}:00`,
            classEndTime: `${String(attendanceIndex).padStart(2, '0')}:45`,
            currentSem: 1,
            attendanceTakenOn: new Date(
              `08-14-2022 ${String(attendanceIndex).padStart(2, '0')}:00`
            ),
            absentStudents: classes.students.ids
              .sort(() => 0.5 - Math.random())
              .slice(0, Math.random() * classes.students.ids.length),
            isTestData: true,
          })
        ) as (I_Attendance & { _id: Types.ObjectId })[],
        classTimeTable: classes.classTimeTables.map(
          (timeTableId, tableIndex) => ({
            _id: timeTableId,
            classId: classes._id,
            collegeId: college._id,
            subjectId: classes.subjects.ids.at(tableIndex % 2 == 0 ? 0 : 1),
            teacherId: college.teachers?.at(classIndex % 2 == 0 ? 0 : 1),
            startingTime: `${String(tableIndex).padStart(2, '0')}:00`,
            endingTime: `${String(tableIndex).padStart(2, '0')}:45`,
            week: tableIndex % 2 == 0 ? Week.monday : Week.wednesday,
            isTestData: true,
          })
        ) as (I_ClassTimeTable & { _id: Types.ObjectId })[],
      })),
    })),

    teachers: college.teachers?.map((teacherId, teacherIndex) => {
      const randomCourseWithRandomClasses = randomCourses
        .map(course =>
          course.classes
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.random() * course.classes.length)
        )
        .flat(); // to merge two lists into one;

      const randomAssignedClasses = randomCourseWithRandomClasses.map(
        classes => classes._id
      );
      const randomAssignedSubjects = randomCourseWithRandomClasses
        .map(classes =>
          classes.subjects.ids
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.random() * classes.subjects.ids.length)
        )
        .flat();

      return {
        _id: teacherId,
        name: `Teacher Name${teacherIndex}`,
        email: `college${collegeIndex}.teacher${teacherIndex}@gmail.com`,
        password: 'Newta1234',
        collegeId: college._id,
        userType: UserType.teacher,
        assignedClasses: randomAssignedClasses,
        assignedSubjects: randomAssignedSubjects,
        dob: new Date('03-13-1988'),
        isTestData: true,
      };
    }) as (I_Teacher & { _id: Types.ObjectId })[],
    faculties: college.faculty.map((facultyId, facultyIndex) => ({
      _id: facultyId,
      name: `Faculty ${facultyIndex}`,
      username: `faculty_college${collegeIndex}_${facultyIndex}`,
      email: `college${collegeIndex}.faculty${facultyIndex}@gmail.com`,
      password: 'Newta1234',
      collegeId: college._id,
      userType: UserType.staff,
      isTestData: true,
    })) as (I_Faculty & { _id: Types.ObjectId })[],
  };
});
