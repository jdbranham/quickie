package net.savantly.quickie.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class ClientSecurityContext {

	private boolean anonymous;
	private boolean authenticated;
	private boolean fullyAuthenticated;
	private Object principal;
	private boolean rememberMe;
	private Collection<? extends GrantedAuthority> authorities;

	public void setAnonymous(boolean anonymous) {
		this.anonymous = anonymous;
	}

	public boolean isAuthenticated() {
		return authenticated;
	}

	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}

	public boolean isFullyAuthenticated() {
		return fullyAuthenticated;
	}

	public void setFullyAuthenticated(boolean fullyAuthenticated) {
		this.fullyAuthenticated = fullyAuthenticated;
	}

	public Object getPrincipal() {
		return principal;
	}

	public void setPrincipal(Object principal) {
		this.principal = principal;
	}

	public boolean isRememberMe() {
		return rememberMe;
	}

	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public boolean isAnonymous() {
		return anonymous;
	}

	

}
