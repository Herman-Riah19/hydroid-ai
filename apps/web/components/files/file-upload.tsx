'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { FileServices } from '@/services/fileServices';
import { useAuthStore } from '@/lib/auth-store';

interface FileUploadProps {
  onUploadSuccess?: (file: any) => void;
}

export function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = useAuthStore.getState().token;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await FileServices.uploadFile(file, token as string);
      
      if (result.success) {
        setSuccess('Fichier uploadé avec succès');
        setFile(null);
        if (onUploadSuccess) {
          onUploadSuccess(result.data);
        }
      } else {
        setError(result.message || 'Erreur lors de l\'upload');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload de fichier</CardTitle>
        <CardDescription>
          Sélectionnez un fichier à uploader
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Fichier</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              required
            />
          </div>
          {file && (
            <div className="text-sm text-gray-600">
              Fichier sélectionné: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm">{success}</div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Upload...' : 'Uploader'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}