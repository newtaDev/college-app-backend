import classService from '../../modules/class/class.service';
import collegeService from '../../modules/college/college.service';
import courseService from '../../modules/course/course.service';
import subjectService from '../../modules/subject/subject.service';
import teacherService from '../../modules/user/teacher/teacher.service';

interface I_MongoModelIds {
  collegeId?: string;
  classId?: string;
  courseId?: string;
  subjectId?: string;
  teacherId?: string;
}

/* if given Id is not null then it will validate
 Also checks if it belongs to same college or not */
export const isMongoIdExitsOrValid = async (params: I_MongoModelIds) => {
  const collegeId = params.collegeId;
  if (collegeId) {
    const _college = await collegeService.findOne({ _id: collegeId });
    if (!_college) throw Error("College id doesn't exists");
  }
  if (params.classId) {
    if (!collegeId) throw Error('req.user.collegeId required');

    const _class = await classService.findOne(
      {
        _id: params.classId,
        ...(collegeId && { collegeId }),
      },
      collegeId
    );

    if (!_class)
      throw Error("Class id doesn't exists / Access Denied for Your collegeId");
  }
  if (params.subjectId) {
    const _subject = await subjectService.findOne({
      _id: params.subjectId,
      ...(collegeId && { collegeId }),
    });
    if (!_subject)
      throw Error(
        "Subject id doesn't exists / Access Denied for Your collegeId"
      );
  }
  if (params.courseId) {
    const _course = await courseService.findOne({
      _id: params.courseId,
      ...(collegeId && { collegeId }),
    });
    if (!_course)
      throw Error(
        "Course id doesn't exists / Access Denied for Your collegeId"
      );
  }
  if (params.teacherId) {
    const teacher = await teacherService.findOne({
      _id: params.teacherId,
      ...(collegeId && { collegeId }),
    });
    if (!teacher)
      throw Error(
        "Teacher id doesn't exists / Access Denied for Your collegeId"
      );
  }
};
