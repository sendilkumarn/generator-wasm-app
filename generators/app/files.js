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
        let files = fs.readdirSync(`${__dirname}/templates/${dir}`);
        for (let file of files) {
            filesToCopy.push({
                name: file,
                src: dir,
                dest: dir
            });
        }
    });

    return filesToCopy;
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
