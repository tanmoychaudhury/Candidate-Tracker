/**
 * API routes for Saving Bill Details 
 */
'use strict';
const express = require('express');
const service = global.local_require('api/record/service');
const logger = global.local_require('/utils/logger');

const api = 'CANDIDATE RECORD API :';
const file = 'api.record.index';

const record= express();

/**
 * @swagger
 * definitions:
 *    CANDIDATE:
 *     properties:
 *       NAME:
 *         type: string
 *         example: Deadpool
 *       BILLDATE:
 *         type: string
 *         example: "2017-06-15"
 *       AMOUNT:
 *         type: string
 *         example: 450
 *       MEMBER1:
 *         type: string
 *         example: 100
 *       MEMBER2:
 *         type: string
 *         example: 50
 *       MEMBER3:
 *         type: string
 *         example: 100
 *       MEMBER4:
 *         type: string
 *         example: 50
 *       MEMBER5:
 *         type: string
 *         example: 150
 *       BILLDESC:
 *         type: string
 *         example: Chimichanga
 **/

/**
 * @swagger
 *  /api/v1/record/add:
 *   post:
 *     tags:
 *       - Candidate Details
 *     summary: add Candidate details
 *     description: save candidates details into the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user input that needs to be saved into the database
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CANDIDATE'
 *     responses:
 *       200:
 *         description: successful operation
 */

record.post('/add',  function(req, res) {
	const func = '.post';
	//console.log('req = '+JSON.stringify(req.body));
	try {
	   //console.log('req.body = '+JSON.stringify(req));
        if(req.body && Object.keys(req.body).length > 0) {
	        let request_ip = req.body;
	        //console.log('inside req.body = '+JSON.stringify(req.body));
                     service.save_data(request_ip,function(err,data){
                        if(!err){
                            res.status(200).json(data);     
                        }else{
                        	//console.log('err = '+JSON.stringify(err));
               				let status = err.status;
                            let error = err.error;
                            let message = err.message;
                            let response_message = {'status':status,'message':message};
                            logger.error(api+file+func+' Internal Server Error in saving candidate details :'+err);  
                            res.status(status).json(response_message);
                        }
                    });
             
        }else{
             res.status(422).json({'status':422,'message':'Missing or Unparsebale Entity','data':[]});
        }
       }catch(err){
        logger.error(api+file+func+' Internal Server Error in saving bill details :'+err);
        //console.log('catch err = '+JSON.stringify(err));
        res.status(500).json({'status':500,'message':'API Response Error'});
 }
});

/**
 * @swagger
 *  /api/v1/record/update/{id}:
 *   put:
 *     tags:
 *       - Candidate Details
 *     summary: update candidate details 
 *     description: update an candidate details into the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: bill id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: user object that needs to be updated to the application
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CANDIDATE'
 *     responses:
 *       200:
 *         description: successful operation
 */


record.put('/update/:id', function(req, res) {
	const func = '.put';
	    try {
	        var doc_id = req.params.id;
	        if(doc_id ===''){
	            res.status(422).json({'status':422,'message':'Missing or Unparsebale Entity','data':[]});           
	        }
	        else{
                if(req.body && Object.keys(req.body).length > 0) {
                    let request_ip = req.body;
                    // console.log('doc_id = '+doc_id);
                    // console.log('request_ip = '+JSON.stringify(request_ip));
    	            service.update_candidate_details(doc_id,request_ip,function(err,data){
                        if(!err){
                            res.status(200).json(data);
                        }else{
                            logger.error(api+file+func+' Internal Server Error in updating candidate details :'+err); 
                            //console.log('try err = '+JSON.stringify(err)); 
                            res.status(500).json({'status':500,'message':'API Response Error','data':[]});
                        }
                    });
                }else{
                   res.status(422).json({'status':422,'message':'Missing or Unparsebale Entity','data':[]});
                }
            }
	       }catch(err){
                logger.error(api+file+func+' Internal Server Error in updating candidate details :'+err);
                //console.log('catch err = '+JSON.stringify(err));  
                res.status(500).json({'status':500,'message':'API Response Error','data':[]});
	     }
	});

/**
 * @swagger
 * /api/v1/record/show/all:
 *   get:
 *     tags:
 *       - Candidate Details
 *     summary: find all candidates  
 *     description: Returns all candidates
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns all candidates from database
 *         schema:
 *           $ref: '#/definitions/CANDIDATE'
 */

record.get('/show/all',  function(req, res) {
	const func = '.get';
	    try {
	        service.show_all_candidate_details(function(err,result){
	            if(!err){
	                res.status(200).json({'status':'ok','message':'success','data':result});
	            }else{
	                logger.error(api+file+func+' Internal Server Error in retriving all candidate details from database :'+err);  
	                res.status(500).json({'status':500,'message':'API Response Error','data':[]});
	            }
	        });
	     }catch(err){
	        logger.error(api+file+func+' Internal Server Error in retriving all candidate details from database :'+err);  
	        res.status(500).json({'status':500,'message':'API Response Error','data':[]});
	    }
	});

/**
 * @swagger
 * /api/v1/record/show/enrolled:
 *   get:
 *     tags:
 *       - Candidate Details
 *     summary: find enrolled candidates  
 *     description: Returns enrolled candidates
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns enrolled candidates from database
 *         schema:
 *           $ref: '#/definitions/CANDIDATE'
 */

record.get('/show/enrolled',  function(req, res) {
	const func = '.get';
	    try {
	        service.show_enrolled_candidate_details(function(err,result){
	            if(!err){
	                res.status(200).json({'status':'ok','message':'success','data':result});
	            }else{
	                logger.error(api+file+func+' Internal Server Error in retriving enrolled candidate details from database :'+err);  
	                res.status(500).json({'status':500,'message':'API Response Error','data':[]});
	            }
	        });
	     }catch(err){
	        logger.error(api+file+func+' Internal Server Error in retriving enrolled candidate details from database :'+err);  
	        res.status(500).json({'status':500,'message':'API Response Error','data':[]});
	    }
	});

module.exports = record;
