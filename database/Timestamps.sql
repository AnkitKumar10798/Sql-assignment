CREATE FUNCTION modifiedOn()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = CURRENT_TIMESTAMP
(0)
RETURN NEW;
END;
$$
LANGUAGE plpgsql;
--Trigger for updated_on in users
CREATE TRIGGER updatedOn BEFORE
INSERT OR
UPDATE
ON users
FOR EACH ROW
EXECUTE PROCEDURE modifiedOn
();
--Trigger for updated_on in roles
CREATE TRIGGER updatedOn BEFORE
INSERT OR
UPDATE
ON roles
FOR EACH ROW
EXECUTE PROCEDURE modifiedOn
();
--Trigger for updated_on in customers
CREATE TRIGGER updatedOn BEFORE
INSERT OR
UPDATE
ON customer
FOR EACH ROW
EXECUTE PROCEDURE modifiedOn
();