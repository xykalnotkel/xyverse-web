import { readFileSync } from 'node:fs';
// Legal markdown still keeps a readable fallback; rendered contact follows site settings.
export default function kontakPublik() {
  const {email}=JSON.parse(readFileSync(new URL('../src/data/settings.json',import.meta.url),'utf8'));
  return tree => {
    function walk(node) {
      if(node.type==='text')node.value=node.value.replaceAll('xycdigital@gmail.com',email);
      if(node.properties?.href?.startsWith('mailto:xycdigital@gmail.com'))node.properties.href=node.properties.href.replace('xycdigital@gmail.com',email);
      for(const child of node.children||[])walk(child);
    }
    walk(tree);
  };
}
