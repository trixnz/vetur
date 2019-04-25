import { platform } from 'os';
import Uri from 'vscode-uri';

export function getFileFsPath(documentUri: string): string {
  return Uri.parse(documentUri).fsPath;
}

export function getFilePath(documentUri: string): string {
  const IS_WINDOWS = platform() === 'win32';
  if (IS_WINDOWS) {
    // Windows have a leading slash like /C:/Users/pine
    return Uri.parse(documentUri).path.slice(1);
  } else {
    return Uri.parse(documentUri).path;
  }
}

function normalizeSlashes(documentUri: string) {
  return documentUri.replace(/\\/g, '/');
}

export function getNormalizedFilePathAsFileSchema(documentUri: string) {
  const uri = Uri.parse(documentUri);
  const convertedUri = uri.scheme === 'file' ? uri : Uri.file(normalizeSlashes(documentUri));

  return convertedUri;
}

export function getNormalizedFilePath(documentUri: string) {
  const uri = Uri.parse(documentUri);

  if (uri.scheme !== 'file') {
    return normalizeSlashes(documentUri);
  }

  return normalizeSlashes(uri.fsPath);
}
