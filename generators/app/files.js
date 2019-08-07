const fs = require('fs');

// Add conditions here, by default it is for all types of configuration
const getAllRequiredFilesWithCondition = async () => {
    const directories = ['crate', 'js'];
    let filesToCopy = [
        { name: 'index.html.ejs' },
        { name: '.gitignore.ejs' },
        { name: 'package.json.ejs' },
        { name: 'README.md.ejs' },
        {
            name: 'webpack.config.js.ejs',
            condition: generator => generator.props.bundler === 'Webpack'
        }
    ];

    await directories.forEach(dir => {
        filesToCopy.push(...getAllFiles(`${__dirname}/templates/${dir}`));
        console.log(filesToCopy)
    });

    return filesToCopy;
};

const getAllFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const stat = fs.statSync(`${dir}/${file}`);

        if (stat.isDirectory()) {
            getAllFiles(`${dir}/${file}`, fileList);
        } else {
            console.log(dir);
            const rDir = dir.replace(`${__dirname}/templates/`, '');
            fileList.push({
                name: file,
                src: rDir,
                dest: rDir
            });
        }
    }

    return fileList;
};

const getFileLocation = (name, dir) => {
    let fileLoc = name;
    if (dir) {
        fileLoc = `${dir}/${fileLoc}`;
    }

    return fileLoc;
};

const writeFiles = async generator => {
    const files = await getAllRequiredFilesWithCondition();
    for (let file of files) {
        if (!file.condition || file.condition(generator)) {
            const fromSrc = getFileLocation(file.name, file.src);
            const fileNameWithoutEjs = file.name.replace('.ejs', '');
            const toDest = getFileLocation(fileNameWithoutEjs, file.dest);
            console.log(file.name)
            generator.fs.copyTpl(
                generator.templatePath(fromSrc),
                generator.destinationPath(toDest),
                { props: generator.props }
            );
        }
    }
};

module.exports = {
    writeFiles,
    getAllRequiredFilesWithCondition,
    getFileLocation
};
