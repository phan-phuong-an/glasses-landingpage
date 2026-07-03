import fs from 'fs/promises';
import path from 'path';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compDir = path.join(__dirname, 'src/components');

// Hàm để chia mảng thành các phần nhỏ (chunk)
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function translateComments() {
  try {
    const files = await fs.readdir(compDir);
    const jsxFiles = files.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    
    for (const file of jsxFiles) {
      const filePath = path.join(compDir, file);
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Tìm khớp với // comment, {/* comment */}, /* comment */
      // Tránh việc tìm nhầm http:// hoặc https://
      const regex = /(?<!https?:)\/\/(.+)|\{\/\*([\s\S]*?)\*\/\}/g;
      
      const matches = [];
      let match;
      while ((match = regex.exec(content)) !== null) {
        matches.push({
          full: match[0],
          text: match[1] || match[2],
          isJsx: !!match[2]
        });
      }

      if (matches.length === 0) continue;

      console.log(`Đang dịch ${matches.length} chú thích trong ${file}...`);
      
      // Dịch lần lượt với độ trễ nhỏ để tránh quá tải API, hoặc gộp lại gửi một lần.
      // Ở đây sử dụng cách gộp chung (batch) bằng dấu phân cách:
      const chunks = chunkArray(matches, 50); // Dịch 50 chú thích mỗi lần
      
      for (const chunk of chunks) {
        const textToTranslate = chunk.map(m => m.text.trim()).join('\n|||\n');
        try {
          const res = await translate(textToTranslate, { to: 'vi' });
          const translatedTexts = res.text.split('\n|||\n');
          
          for (let i = 0; i < chunk.length; i++) {
            const original = chunk[i];
            const translated = translatedTexts[i] || original.text;
            
            // Tái tạo lại định dạng chú thích ban đầu
            let newComment;
            if (original.isJsx) {
              newComment = `{/* ${translated} */}`;
            } else {
              newComment = `// ${translated}`;
            }
            
            content = content.replace(original.full, newComment);
          }
        } catch (e) {
          console.error(`Lỗi khi dịch một đoạn trong ${file}:`, e.message);
        }
      }

      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`Đã cập nhật ${file}`);
    }
    console.log('Hoàn thành việc dịch chú thích!');
  } catch (err) {
    console.error(err);
  }
}

translateComments();
