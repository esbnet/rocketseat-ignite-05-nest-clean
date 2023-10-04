import { Student } from '../../enterprise/entities/student'

export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  // abstract findBySlug(slug: string): Promise<Question | null>
  // abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract create(question: Student): Promise<void>
  // abstract update(question: Question): Promise<void>
  // abstract delete(question: Question): Promise<void>
}
