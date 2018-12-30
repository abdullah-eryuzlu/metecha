const express = require('express');
const AuthController = require('../controllers/authController');
const HospitalController = require('../controllers/hospitalController');
const jwt = require('jsonwebtoken');
const helper = require('../helper');
const Middlewares = require('../middlewares/middlewares');

module.exports = function(router) {

  // MIDDLEWARES

  router.use(['/api/get_relations_others/:userId',
              '/api/add_relation',
              '/api/add_relation_others',
              '/api/delete_relation/:userId',
              '/api/delete_relation_others/:userId/:fromId',
              '/api/add_record', '/api/get_records/:userId',
              '/api/delete_user/:userId',
              '/api/send_record/:userId/:recordId'], Middlewares.fetchOtherUser);


  // Add, delete and get user
  router.use('/api/add_user', Middlewares.addUser);
  router.post('/api/add_user', AuthController.addUser);

  router.use('/api/get_users/:userType', Middlewares.getUsers);
  router.get('/api/get_users/:userType', HospitalController.getUsers);

  router.use('/api/delete_user/:userId', Middlewares.deleteUser);
  router.get('/api/delete_user/:userId', HospitalController.deleteUser);

  // Add, get and delete relation
  router.use('/api/add_relation', Middlewares.addRelation);
  router.post('/api/add_relation', HospitalController.addRelation);

  router.use('/api/add_relation_others', Middlewares.addRelationForOthers);
  router.post('/api/add_relation_others', HospitalController.addRelationForOthers);

  router.use('/api/get_relations/:userType', Middlewares.getRelations);
  router.get('/api/get_relations/:userType', HospitalController.getRelations);

  router.use('/api/get_relations_others/:userId', Middlewares.getRelationsOther);
  router.get('/api/get_relations_others/:userId', HospitalController.getRelationsOther);

  router.use('/api/delete_relation/:userId', Middlewares.deleteRelation);
  router.get('/api/delete_relation/:userId', HospitalController.deleteRelation);

  router.use('/api/delete_relation_others/:userId/:fromId', Middlewares.deleteRelationOther);
  router.get('/api/delete_relation_others/:userId/:fromId', HospitalController.deleteRelationOther);

  router.use('/api/add_record', Middlewares.addRecord);
  router.post('/api/add_record', HospitalController.addRecord);

  router.use('/api/get_records/:userId', Middlewares.getRecords);
  router.get('/api/get_records/:userId', HospitalController.getRecords);

  router.use('/api/change_password', Middlewares.changePassword);
  router.post('/api/change_password', AuthController.changePassword);

  router.use('/api/send_record/:userId/:recordId', Middlewares.sendRecord);
  router.get('/api/send_record/:userId/:recordId', HospitalController.sendRecord);

  router.use('/api/get_notifications/', Middlewares.getNotifications);
  router.get('/api/get_notifications/', HospitalController.getNotifications);

  router.use('/api/get_notification/:notifId', Middlewares.getNotifications);
  router.get('/api/get_notification/:notifId', HospitalController.getNotification);
  /////////


  //
  router.post('/authenticate', AuthController.login);
  router.get('/api/logout', AuthController.logout);
  router.get('/api/check_session', AuthController.check_session);

  router.post('/public/change_password/:pwReqHash', AuthController.changePasswordPublic);
  router.get('/public/request/change_password/:email', AuthController.changePasswordRequest);
  router.get('/public/activate_account/:activationHash', AuthController.activateAccount);
  router.get('/public/unblock_account/:unblockHash', AuthController.unblockAccount);
  router.get('/activation_failed', (req, res) => {
    return res.send('Activation failed. Please try again or get in touch with an admin.');
  });

  router.get('/unblock_failed', (req, res) => {
    res.send('We could not unblock your account. Please get in touch with an admin.');
  });

  router.post('/development/add_user', AuthController.developmentAdd);
}
