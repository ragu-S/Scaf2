export default function(files, acceptedTypes) {
  if (!files || files.length === 0) return false;
  const fileArray = Array.from(files);
  return fileArray.every(f => {
    return acceptedTypes.includes(f.type);
  });
}
