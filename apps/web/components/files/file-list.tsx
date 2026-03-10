'use client';

import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { FileServices } from '@/services/fileServices';
import { useAuthStore } from '@/lib/auth-store';

interface FileListProps {
  refreshTrigger?: number;
}

export function FileList({ refreshTrigger }: FileListProps) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = useAuthStore.getState().token;

  const fetchFiles = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await FileServices.getAllFiles(token as string);
      
      if (result.success) {
        setFiles(result.data || []);
      } else {
        setError(result.message || 'Erreur lors de la récupération des fichiers');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]);

  const handleDelete = async (fileId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier?')) {
      return;
    }

    try {
      const result = await FileServices.deleteFile(fileId, token as string);
      
      if (result.success) {
        setFiles(files.filter(file => file.id !== fileId));
      } else {
        setError(result.message || 'Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des fichiers</CardTitle>
        <CardDescription>
          {files.length} fichier(s) trouvé(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {files.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Aucun fichier trouvé
          </div>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{file.name || file.filename}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">
                      {file.type || 'Unknown'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {file.size && formatFileSize(file.size)}
                    </span>
                  </div>
                  {file.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Créé le: {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    Voir
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}