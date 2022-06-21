ALTER TABLE ila_groups
enable CONSTRAINT "FK_ILA_GROUPS_User_Id";

ALTER TABLE ila_users
enable CONSTRAINT "FK_ILA_USERS_OriginGroup_Id";
