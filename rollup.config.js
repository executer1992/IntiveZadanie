export default [
    {
    input: 'src/index.js',
    output:{
        file: 'src/indexBundle.js',
        format: 'iife',
        name: 'indexModule',
        sourceMap: 'true', 
    }   
},
{
    input: 'src/add.js',
    output:{
        file: 'src/addBundle.js',
        format: 'iife',
        name: 'addModule',
        sourceMap: 'true', 
    }   
}
]