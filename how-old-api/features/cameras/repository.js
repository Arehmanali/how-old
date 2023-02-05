const Knex = require('knex');
const knexConfig = require('../../db/knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

async function getCameras(userId) {
  let cameras = [];
  cameras = await knex('cameras').select().where('user_id', userId);
  return cameras;
}

// eslint-disable-next-line camelcase
async function addNewCamera({ url, user_id }) {
  const [camera] = await knex('cameras')
    // eslint-disable-next-line camelcase
    .insert({ url, user_id, updated_at: new Date() })
    .returning(['id', 'url', 'user_id', 'created_at', 'updated_at']);
  return camera;
}

async function removeCamera(id) {
  const [camera] = await knex('cameras')
    // eslint-disable-next-line camelcase
    .del()
    .where('id', id)
    .returning(['id', 'url', 'user_id', 'created_at', 'updated_at']);
  return camera;
}

module.exports = {
  getCameras,
  addNewCamera,
  removeCamera,
};
