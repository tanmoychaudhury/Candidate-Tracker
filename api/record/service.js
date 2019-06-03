'use strict';
const async =require('async');
const logger = global.local_require('/utils/logger');
const c_utils = global.local_require('/utils/commonutils');
const cloudant = global.local_require('/utils/cloudantutils');

const api = 'CANDIDATE RECORD API :';
const file = 'api.record.index';


exports = module.exports = {
		save_data:save_data,
		update_candidate_details:update_candidate_details,
		show_all_candidate_details:show_all_candidate_details,
		show_enrolled_candidate_details:show_enrolled_candidate_details
}


function save_data(request_data,cb){
	let func = ".save_data"
	
	cloudant.insert_document(request_data,'candidate_details',function(err,data){
		if(err){
			//console.log('error saving doc'+JSON.stringify(err));
			logger.error(api+file+func+"ERROR saving candidate detials "+err);
			cb(err,null);
		}
		else{
			//console.log('save doc success = '+data);
			let op = {'status':200,'message':'Candidate details saved successfully','id':data.id};
			logger.info(api+file+func+"Candidate record saved "+data);
			cb(null,op);
		}
});
}

function update_candidate_details(doc_id,request_data,cb){
	let func = ".update_candidate_details"
	cloudant.merge_document('candidate_details',doc_id,request_data,function(err,data){
		if(err){
			//console.log('error saving doc'+JSON.stringify(err));
			logger.error(api+file+func+"ERROR updating candidate details "+err);
			cb(err,null);
		}
		else{
			//console.log('save doc success');
			//console.log(data);
			let op = {'status':200,'message':'Candidate details updated successfully','id':data.id};
			logger.info(api+file+func+"Candidate Details updated "+data);
			cb(null,op);
		}
});
}

function show_all_candidate_details(cb) {
    let func = '.show_all_candidate_details';
    let err_resp ={};
    try{
        cloudant.readAll('candidate_details','candidate','vw_all_candidate',{'include_docs':true},function(err,data){
             if(!err){
                async.map(data.rows,function(candidate,cb){
                    let json = {};
                    try{
                        json['_id'] = candidate.doc._id;
                        json['NAME'] = candidate.doc.NAME;
                        json['AGE'] = candidate.doc.AGE;
                        json['CONTACT_NUMBER'] = candidate.doc.CONTACT_NUMBER;
                        json['ALT_NUMBER'] = candidate.doc.ALT_NUMBER;
                        json['ADDRESS'] = candidate.doc.ADDRESS;
                        json['QUALIFICATION'] = candidate.doc.QUALIFICATION;
                        json['WORK_EXP'] = candidate.doc.WORK_EXP;
                        json['MONTH'] = candidate.doc.MONTH;
                        json['POST'] = candidate.doc.POST;
                        json['INTERVIEW_DATE'] = candidate.doc.INTERVIEW_DATE;
                        json['DOC_DATE'] = candidate.doc.DOC_DATE;
                        json['FEES'] = candidate.doc.FEES;
                        json['PAID'] = candidate.doc.PAID;
                        json['DUE'] = candidate.doc.DUE;
                        json['FEEDBACK'] = candidate.doc.FEEDBACK;
                        json['SMS'] = candidate.doc.SMS;
                    }catch(err){
                        console.log(err);
                    }
                    cb(null,json);
                },function(err,data){
                    if(err){
                        err_resp =  c_utils.set_error_response(500,'ERR500','Internal Server Error '+err);
                        logger.error(api+file+func+' Internal Server Error :'+err);  
                        cb(err_resp,null);
                    }else{
                        cb(null,data);
                        //console.log(JSON.stringify(data));
                    }
                });
            }else{
                cb(null,[]);
            }
            
        });
    }catch(err){
        err_resp =  c_utils.set_error_response(500,'ERR500','Server Error');
		logger.error(api+file+func+' Server Error in retriving data from database:'+err);  
		cb(err_resp,null);
    }
}

function show_enrolled_candidate_details(cb) {
    let func = '.show_enrolled_candidate_details';
    let err_resp ={};
    try{
        cloudant.readAll('candidate_details','candidate','vw_enrolled_candidate',{'include_docs':true},function(err,data){
             if(!err){
                async.map(data.rows,function(candidate,cb){
                    let json = {};
                    try{
                        json['_id'] = candidate.doc._id;
                        json['NAME'] = candidate.doc.NAME;
                        json['AGE'] = candidate.doc.AGE;
                        json['CONTACT_NUMBER'] = candidate.doc.CONTACT_NUMBER;
                        json['ALT_NUMBER'] = candidate.doc.ALT_NUMBER;
                        json['ADDRESS'] = candidate.doc.ADDRESS;
                        json['QUALIFICATION'] = candidate.doc.QUALIFICATION;
                        json['WORK_EXP'] = candidate.doc.WORK_EXP;
                        json['MONTH'] = candidate.doc.MONTH;
                        json['POST'] = candidate.doc.POST;
                        json['INTERVIEW_DATE'] = candidate.doc.INTERVIEW_DATE;
                        json['DOC_DATE'] = candidate.doc.DOC_DATE;
                        json['FEES'] = candidate.doc.FEES;
                        json['PAID'] = candidate.doc.PAID;
                        json['DUE'] = candidate.doc.DUE;
                        json['FEEDBACK'] = candidate.doc.FEEDBACK;
                        json['SMS'] = candidate.doc.SMS;
                    }catch(err){
                        console.log(err);
                    }
                    cb(null,json);
                },function(err,data){
                    if(err){
                        err_resp =  c_utils.set_error_response(500,'ERR500','Internal Server Error '+err);
                        logger.error(api+file+func+' Internal Server Error :'+err);  
                        cb(err_resp,null);
                    }else{
                        cb(null,data);
                        //console.log(JSON.stringify(data));
                    }
                });
            }else{
                cb(null,[]);
            }
            
        });
    }catch(err){
        err_resp =  c_utils.set_error_response(500,'ERR500','Server Error');
		logger.error(api+file+func+' Server Error in retriving data from database:'+err);  
		cb(err_resp,null);
    }
}
