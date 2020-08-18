const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../members');


//get all members
router.get('/', (req, res) => res.json(members));

//get single member
router.get('/:id', (req, res) => {
    const found = (members.some(members => members.id === parseInt(req.params.id)));
    
    if(found)
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    else
        res.status(400).json({msg: 'No member with the given id: '+ req.params.id});
});

//Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    
    if( !newMember.name || !newMember.email){
        return res.status(400).json({msg: 'Please include name and email'});
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

//Update member
router.put('/:id', (req, res) => {
    const found = (members.some(members => members.id === parseInt(req.params.id)));
    
    if(found){
        const updMember= req.body;
        members.forEach(members => {
            if(members.id === parseInt(req.params.id)){
                members.name = updMember.name ? updMember.name : members.name;
                members.email = updMember.email ? updMember.email : members.email;
                
                res.json({msg: "Member updated", members});
            }
        });
    }
    else
        res.status(400).json({msg: 'No member with the given id: '+ req.params.id});
});

//Delete Member
router.delete('/:id', (req, res) => {
    const found = (members.some(members => members.id === parseInt(req.params.id)));
    
    if(found)
        res.json({msg : 'member delete', member: members.filter(members => members.id !== parseInt(req.params.id))});
    else
        res.status(400).json({msg: 'No member with the given id: '+ req.params.id});
});

module.exports = router;