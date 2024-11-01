import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // 引入 uuid 库

interface ApiReference {
    id: string;
    title: string;
    content: string;
}

function generateIdFromContent(content: string): string {
    return uuidv4(); // 使用 uuid 生成唯一 ID
}

function parseData(filePath: string): ApiReference[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    const sections = data.split(/《《|》》/).filter(section => section.trim());
    const parsedSections: ApiReference[] = [];

    let currentTitle = '';
    let currentContent = '';

    sections.forEach((section, index) => {
        if (index % 2 === 0) { // 偶数索引为标题
            if (currentTitle) {
                parsedSections.push({
                    id: generateIdFromContent(currentContent), // 为当前条目生成 ID
                    title: currentTitle,
                    content: currentContent.trim()
                });
            }
            currentTitle = section.trim();
            currentContent = '';
        } else { // 奇数索引为内容
            currentContent += section.trim() + '\n';
        }
    });

    // 添加最后一部分
    if (currentTitle) {
        parsedSections.push({
            id: generateIdFromContent(currentContent), // 为最后一部分生成 ID
            title: currentTitle,
            content: currentContent.trim()
        });
    }

    return parsedSections;
}

function parseAllTsdbFiles(directory: string): ApiReference[] {
    const parsedSections: ApiReference[] = [];

    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            // 如果是目录，递归调用
            const nestedSections = parseAllTsdbFiles(filePath);
            parsedSections.push(...nestedSections);
        } else if (file.endsWith('.tsdb')) {
            // 如果是.tsdb文件，解析它
            const apiReferences = parseData(filePath);
            parsedSections.push(...apiReferences);
        }
    });

    return parsedSections;
}

const resDirectory = path.join(__dirname, 'res');
const allParsedData = parseAllTsdbFiles(resDirectory);

// 将解析结果保存为 help.json
const outputFilePath = path.join(__dirname, 'help.json');
fs.writeFileSync(outputFilePath, JSON.stringify({ "apiInfo": allParsedData }, null, 2), 'utf-8');

console.log(`Parsed data saved to ${outputFilePath}`);