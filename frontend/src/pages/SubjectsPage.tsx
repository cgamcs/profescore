import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubjectPageLoader } from '../layouts/SkeletonLoader';
import AddSubjectModal from '../components/AddSubjectModal';
import api from '../api';
import useViewTransition from '../layouts/useViewTransition';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface ISubject {
  _id: string;
  name: string;
  department?: {
    _id: string;
    name: string;
  };
  professors: {
    _id: string;
    name: string;
  }[];
}

interface IProfessor {
  _id: string;
  name: string;
  department: string | string[];
  subjects: string[];
  ratingStats: {
    averageGeneral: number;
    totalRatings: number;
  };
}

const SubjectsPage = () => {
  const { facultyId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { handleLinkClick } = useViewTransition();
  const subjectsContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const { data: subjects = [], isLoading: subjectsLoading } = useQuery({
    queryKey: ['subjects', facultyId],
    queryFn: () => api.get(`/faculties/${facultyId}/subjects`).then(res => res.data),
  });

  const { data: professors = [], isLoading: professorsLoading } = useQuery({
    queryKey: ['professors', facultyId],
    queryFn: () => api.get(`/faculties/${facultyId}/professors`).then(res => res.data),
  });

// En ambos componentes, añadir este useEffect
useEffect(() => {
  document.title = "ProfeScore - Materias";
  
  const mainElement = document.getElementById('main-content');
  if (mainElement) {
    mainElement.style.viewTransitionName = 'main-content';
    mainElement.style.contain = 'layout';
  }

  return () => {
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      mainElement.style.viewTransitionName = '';
      mainElement.style.contain = '';
    }
  };
}, []);

  // Capturar la altura del contenedor una vez que los datos se han cargado
  useEffect(() => {
    if (!subjectsLoading && !professorsLoading && subjectsContainerRef.current) {
      setContainerHeight(subjectsContainerRef.current.offsetHeight);
    }
  }, [subjectsLoading, professorsLoading, subjects, professors]);

  const isLoading = subjectsLoading || professorsLoading;

  // Función para normalizar el texto (eliminar acentos y convertir a minúsculas)
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredSubjects = subjects.filter((subject: ISubject) =>
    searchQuery === '' || normalizeText(subject.name).includes(normalizeText(searchQuery))
  );

  const filteredProfessors = professors.filter((professor: IProfessor) =>
    searchQuery !== '' && normalizeText(professor.name).includes(normalizeText(searchQuery))
  );

  if (isLoading) return <SubjectPageLoader />;

  return (
    <main id="main-content" data-view-transition className="container mx-auto px-4 py-6">
      {showSuccessMessage && (
        <div className="fixed top-15 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg notification">
          Materia guardada correctamente
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="dark:text-white text-2xl font-bold">Materias</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:cursor-pointer"
        >
          Agregar Materia
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre del maestro o materia..."
          className="w-full border dark:text-white border-gray-200 dark:border-[#2B2B2D] px-4 py-3 rounded-xl shadow-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-[#383939] w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Lista de materias y profesores con altura fija durante transiciones */}
      <div
        ref={subjectsContainerRef}
        className="border border-gray-200 dark:border-[#383939] rounded-lg overflow-hidden transition-all"
        style={{
          minHeight: containerHeight ? `${containerHeight}px` : '300px'
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Detalles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.map((subject: ISubject) => (
              <TableRow key={subject._id}>
                <TableCell>
                  <a
                    href={`/facultad/${facultyId}/materia/${subject._id}`}
                    onClick={(e) => handleLinkClick(`/facultad/${facultyId}/materia/${subject._id}`, e)}
                    className="text-indigo-600 dark:text-white font-medium"
                  >
                    {subject.name}
                  </a>
                </TableCell>
                <TableCell>{subject.professors.length} profesor{subject.professors.length !== 1 && 'es'}</TableCell>
              </TableRow>
            ))}

            {filteredProfessors.map((professor: IProfessor) => (
              <TableRow key={professor._id}>
                <TableCell>
                  <a
                    href={`/facultad/${facultyId}/profesor/${professor._id}`}
                    onClick={(e) => handleLinkClick(`/facultad/${facultyId}/profesor/${professor._id}`, e)}
                    className="text-indigo-600 dark:text-white font-medium"
                  >
                    {professor.name}
                  </a>
                </TableCell>
                <TableCell>{professor.ratingStats.totalRatings} reseña{professor.ratingStats.totalRatings !== 1 && 's'}</TableCell>
              </TableRow>
            ))}

            {filteredSubjects.length === 0 && filteredProfessors.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No se encontraron resultados para "{searchQuery}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && facultyId && (
        <AddSubjectModal
          facultyId={facultyId}
          subjects={subjects}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
          }}
        />
      )}
    </main>
  );
};

export default SubjectsPage;