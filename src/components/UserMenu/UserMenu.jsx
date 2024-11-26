import { DropdownItem, DropdownMenu } from "reactstrap";

function UserMenu() {
  return (
    <div>
      <DropdownMenu>
        <DropdownItem header>Account Settings</DropdownItem>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Change Password</DropdownItem>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;
