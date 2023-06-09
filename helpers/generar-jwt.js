const jwt = require('jsonwebtoken');

// jwt trabaja con callbacks y en base a promesas
const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECERT_OR_PRIVATE_KEY, {
            expiresIn: '4h'
        }, ( err, token) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el Token');
            } else {
                resolve( token );
            }
            
        } );

    } );

}

module.exports = {
    generarJWT
}