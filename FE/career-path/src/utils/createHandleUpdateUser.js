export function createHandleUpdateUser(setErrMsg, setSuccessMsg, setIsLoading, fetchUsers, updateUserService) {
    return async (id, updateEmail, validUpdateEmail, updatePassword, validUpdatePassword, updateFirstName, updateLastName, updateRole) => {
        setIsLoading(true);
        setErrMsg("");
        setSuccessMsg("");

        if (updateEmail && !validUpdateEmail) {
            setErrMsg("Email invalid");
            setIsLoading(false);
            return;
        }

        if (updatePassword && !validUpdatePassword) {
            setErrMsg("Parolă invalidă");
            setIsLoading(false);
            return;
        }

        const updatedUser = {id, updateFirstName, updateLastName, updateEmail, updateRole};
        console.log(updateRole);

        if (updatePassword) {
            updatedUser.updatePassword = updatePassword;
        }

        const {success, error} = await updateUserService(updatedUser);

        if (error) {
            setErrMsg(error);
        } else if (success) {
            setSuccessMsg("User updated successfully!");
            await fetchUsers();
        }

        setIsLoading(false);
    };
}