const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

async function getCameras() {
  let cameras = [];
  cameras = await knex('cameras').select();
  return cameras;
}

async function updateCameraInfo({ url }) {
  const [cameras] = await knex('cameras')
    .where({ url })
    .update({
      url,
      updated_at: new Date(),
    })
    .returning('*');
  return cameras;
}

module.exports = {
  getCameras,
  updateCameraInfo,
};
