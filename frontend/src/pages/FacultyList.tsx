import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FacultyListLoader } from '../layouts/SkeletonLoader';
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

const FacultyList: React.FC = () => {
  const { handleLinkClick } = useViewTransition();
  const { data: faculties = [], isLoading, error } = useQuery({
    queryKey: ['faculties'],
    queryFn: () => api.get('/faculties').then(res => res.data.faculties),
    staleTime: 5 * 60 * 1000 // 5 minutos
  });

  if (isLoading) return <FacultyListLoader />;
  if (error) return <div className="text-center text-red-500 py-10">Error al cargar las facultades</div>;

  return (
    <section id="main-content" data-view-transition className="pb-12 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lista de Facultades</h2>
          <p className="text-gray-600 dark:text-[#d4d3d3]">Selecciona tu facultad</p>
        </div>

        <div className="border border-gray-200 dark:border-[#383939] rounded-lg overflow-hidden max-w-3xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Abreviatura</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(faculties) && faculties.map((faculty) => (
                <TableRow key={faculty._id}>
                  <TableCell>
                    <Link
                      to={`/facultad/${faculty._id}`}
                      onClick={(e) => handleLinkClick(`/facultad/${faculty._id}`, e)}
                      className="text-indigo-600 dark:text-white font-medium"
                    >
                      {faculty.name}
                    </Link>
                  </TableCell>
                  <TableCell>{faculty.abbreviation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default FacultyList;
