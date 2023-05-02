const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Eventos', 'postgres', 'postgres', {
  host: '172.18.0.2',
  port: '5432',
  dialect: 'postgres'
});

const Ponto = sequelize.define('ponto',{
  id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
  nome:{
      type: DataTypes.STRING,
      allowNull: false
  },
  descricao:{
      type: DataTypes.STRING,
      allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  geometria:{
      type: DataTypes.GEOMETRY,
      allowNull: false
  }
});


const addPonto = async (request, response) =>{

    const { nome, data, descricao } = request.body;
    const geometria = {type: 'Point', coordinates:[request.body.lat, request.body.lng]}

    console.log(geometria);

    const ponto = Ponto.build({nome, data, descricao, geometria});
    ponto.save().then(()=>{
        response.status(200).send('Ponto salvo!');
    }).catch(err =>{
        console.log(err)
        response.status(400).send('Falha ao salvar');
    });

};

const sincronizar = async () =>{
    await Ponto.sync();
}

const selecionar = async(request, response) =>{

  try {

    const project = await Ponto.findOne({ where: { nome: request.params.nome } })

    if ( ! project ) {
        return response.status(400).json({message: 'Esse Evento não está cadastrado !'});
    }

    return response.status(200).json({coordinates: project.geometria.coordinates})

  } catch (err) {

    return response.status(400).json({error: err})

  }

}

module.exports = {addPonto, sincronizar, selecionar}