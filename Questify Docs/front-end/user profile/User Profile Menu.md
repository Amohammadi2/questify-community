```mermaid
graph LR
	NavLayout --> pm
	pm["UserProfileMenu component"]
	subgraph h["@/store"]
		subgraph "./user-profile.store.ts"
			$userProfile["$userProfile recoil selector"]
		end
		subgraph "./auth.store.ts"
			$authToken["$authToken recoil atom"]
		end
	end
	subgraph g["@/graphql/get-user-profile"]
		GET_USER_PROFILE["GET_USER_PROFILE query"]
	end
	pm --> h
	pm --> g
```

## `UserProfileMenu` component

This component renders user profile and provides links to these sections:
- my questions page
- edit profile page

###### logout functionality

and also it has a logout button which sets `$authToken` to `null` causing the app context to be unauthenticated and tokens to be removed from `local storage`.

###### loading user profile image

It gets user profile image through `GET_USER_PROFILE` query.

> We have plans to remove the need for this query in this component by adding a `profileImg` property on `$userProfile` recoil selector.

![[Pasted image 20240822155600.png]]

It decides to render only if `$userProfile` is not null (user has logged in), otherwise it will return `null` and as a result, the menu will disappear from the navbar. This happens only when user hasn't logged in.
