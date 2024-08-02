// src/components/Avatar.tsx
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import avatarStore from "../../stores/avatarStore";
import AvatarRender from "../../assets/images/AvatarRender";
import DefaultAvatar from "../../assets/images/default_avatar.png";
import authStore from "../../stores/auth.store";

const Avatar: React.FC = observer(() => {
  useEffect(() => {
    if (authStore.user) avatarStore.fetchAvatar();
    else avatarStore.imageUrl = "empty";
  }, []);

  return (
    <div>
      {avatarStore.imageUrl.length < 30 ||
      avatarStore.imageUrl === "http://localhost:3333/files/undefined" ||
      avatarStore.imageUrl === "http://localhost:3333/files/null" ? (
        <AvatarRender image={DefaultAvatar} />
      ) : (
        <AvatarRender image={avatarStore.imageUrl} />
      )}
    </div>
  );
});

export default Avatar;
