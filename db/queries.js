export const GET_ALL_FILES = "SELECT * FROM files";
export const INSERT_A_FILE = "INSERT INTO files(id, name, content) values($1, $2, $3) returning *";
export const GET_A_FILE = "SELECT * FROM files WHERE id=$1";
export const UPDATE_A_FILE = "UPDATE files SET name=$1,content=$2 WHERE id=$3 returning *";
export const DELETE_A_FILE = "DELETE FROM files WHERE id=$1 returning *";
