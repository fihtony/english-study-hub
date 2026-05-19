import Header from '../components/Header';
import Footer from '../components/Footer';
import LessonItem from '../components/LessonItem';
import { lessons } from '../data/lessons';

export default function LessonLibraryPage() {
  return (
    <>
      <Header />
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto min-h-screen">
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">CURRICULUM</p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>
        <div className="flex flex-col space-y-0">
          {lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}