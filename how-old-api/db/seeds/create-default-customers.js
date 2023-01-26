/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// eslint-disable-next-line func-names
exports.seed = async function (knex) {
  await knex('customers').insert([
    { gender: 'male', age: 32, feeling: 'happy', created_at: new Date() },
    { gender: 'male', age: 42, feeling: 'happy', created_at: new Date() },
    { gender: 'female', age: 22, feeling: 'happy', created_at: new Date() },
    { gender: 'female', age: 52, feeling: 'sad', created_at: new Date() },
    { gender: 'female', age: 18, feeling: 'sad', created_at: new Date() },
    { gender: 'male', age: 38, feeling: 'happy', created_at: new Date() },
    { gender: 'female', age: 27, feeling: 'angery', created_at: new Date() },
    { gender: 'male', age: 49, feeling: 'sad', created_at: new Date() },
    { gender: 'female', age: 26, feeling: 'happy', created_at: new Date() },
    { gender: 'male', age: 22, feeling: 'happy', created_at: new Date() },
    { gender: 'female', age: 16, feeling: 'happy', created_at: new Date() },
    { gender: 'male', age: 62, feeling: 'sad', created_at: new Date() },
    { gender: 'male', age: 80, feeling: 'sad', created_at: new Date() },
  ]);
};
