import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import CourseCard from "@/components/courses/CourseCard";
import Categories from "@/components/custom/Categories";

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      subCategories: { orderBy: { name: "asc" } },
    },
  });

  const courses = await getCoursesByCategory(null);

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />
      <div className="flex flex-wrap gap-7 justify-center">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
