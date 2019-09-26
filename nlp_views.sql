USE igs_application;


CREATE VIEW plants AS
SELECT name, alternativenames, typos, link, 0 AS label FROM nlp_list_plant
UNION
SELECT cat_i, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_i), 1 FROM nlp_list_plant
UNION
SELECT cat_ii, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_ii), 1 FROM nlp_list_plant;


CREATE VIEW animals AS
SELECT name, alternativenames, typos, link, 0 as label from nlp_list_animal
UNION 
SELECT cat_i, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_i), 1 FROM nlp_list_animal
UNION 
SELECT cat_ii, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_ii), 1 FROM nlp_list_animal;

CREATE VIEW persons AS
SELECT name, alternativenames, typos, link, 0 as label from nlp_list_person
UNION 
SELECT cat_i, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_i), 1 FROM nlp_list_person
UNION 
SELECT cat_ii, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_ii), 1 FROM nlp_list_person
UNION 
SELECT cat_iii, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_iii), 1 FROM nlp_list_person
UNION 
SELECT cat_iv, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_iv), 1 FROM nlp_list_person
UNION 
SELECT cat_v, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_v), 1 FROM nlp_list_person;

CREATE VIEW objects AS
SELECT name, alternativenames, typos, link, 0 as label from nlp_list_obj
UNION 
SELECT cat_i, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_i), 1 FROM nlp_list_obj
UNION 
SELECT cat_ii, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_ii), 1 FROM nlp_list_obj
UNION 
SELECT cat_iii, NULL, NULL, CONCAT('file:///C:/Users/research/d2rq/dump_nlp_14_11_18.ttl#', cat_iii), 1 FROM nlp_list_obj;

CREATE VIEW predicates AS
SELECT name, alternativenames, typos, link, 0 as label from nlp_list_relations;