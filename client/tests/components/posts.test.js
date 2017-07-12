import React from "react";
import { shallow, mount } from "enzyme";
import moxios from "moxios";
import Posts from "../../components/posts";
import axios from "axios";
import sinon from "sinon";

describe("Posts component", () => {
	beforeEach(() => {
		moxios.install();
	})

	afterEach(() => {
		moxios.uninstall();
	})

	it("should show 3 posts", () => {
		let posts = [{id: 1}, {id: 2}, {id: 3}];
		let wrapper = mount(<Posts posts={posts} />);
		expect(wrapper.find(".grid-item").length).toBe(3);
	})

	it("should get posts on componentWillMount", () => {
		let posts = [{id: 1}, {id: 2}, {id: 3}];
		let wrapper = mount(<Posts posts={posts} />);
		expect(wrapper.props().posts).toEqual(posts);
		expect(wrapper.find(".grid-item").length).toBe(3);
	})
})
