
```mermaid
graph LR
	subgraph h["@/hocs"]
		AuthProvider["AuthProvider HOC"]
	end
	subgraph hook["@/hooks"]
		useAuthentication["useAuthentication hook"]
	end
	h-->useAuthentication 
	subgraph api["@/apis"]
		tokenApi["$tokenApi recoil atom"]
	end
	subgraph authstore["@/store/auth.store"]
		$authToken["$authToken recoil atom"]
		$isAuthTokenValidated["$isAuthTokenValidated recoil atom"]
	end
	useAuthentication --> tokenApi & authstore
```


## `AuthProvider` HOC

This high order component is responsible for initiating the `useAuthentication` hook. This component is called inside `App.tsx` when the application loads, this causes this mechanism to happen automatically.

It also blocks the rendering of rest of the components of the application unless the authentication state is determined by `useAuthentication` hook (the `loading` state becomes `false`)

## `useAuthentication` hook


```mermaid
graph LR
	A{"Are there any access tokens in $authToken?"}
	A --no--> B["determine user as unauthenticated"]
	A --yes--> C{"Is refresh token still valid?"}
	C --no--> D["Clear the token from $authToken"] --> B
	C --yes--> E["obtain a new token pair"] --> F["set the value of recoil stores"] --> H["Determine user as authenticated"] --> G("END")
	B --> G
```

This hook is responsible for determining the state of authentication in application context and keeping the user logged in by obtaining new token pairs every time the application starts




