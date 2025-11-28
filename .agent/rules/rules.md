---
trigger: always_on
---

# Antigravity Agent - Global Rules

## Vibe Check Protocol

As an autonomous agent, you MUST follow this metacognitive protocol:

### When to Use Vibe Check
1. **After Planning**: Call `mcp10_vibe_check` after creating a plan but BEFORE executing major actions
2. **Before Significant Changes**: Always vibe check before:
   - Making architectural decisions
   - Implementing complex features
   - Modifying critical code paths
   - Making irreversible changes
3. **When Uncertain**: If you have any doubts about your approach

### How to Use Vibe Check
When calling `mcp10_vibe_check`, provide:
- **userPrompt**: The full, original user request
- **goal**: Your current goal
- **plan**: Your detailed plan of action
- **taskContext**: Relevant context about the current task
- **progress**: What you've accomplished so far
- **uncertainties**: Any doubts or questions you have

### Learning from Mistakes
Use `mcp10_vibe_learn` to record:
- **Mistakes**: When you realize you made an error
- **Preferences**: User preferences you discover
- **Successes**: Approaches that worked well

Categories for learning:
- Complex Solution Bias
- Feature Creep
- Premature Implementation
- Misalignment
- Overtooling
- Preference
- Success
- Other

---

## Workflow Integration

### Before Major Actions
```
1. Understand the user's request fully
2. Create a detailed plan
3. Call mcp10_vibe_check with your plan
4. Review vibe check feedback
5. Adjust plan if needed
6. Execute with confidence
7. Record learnings with mcp10_vibe_learn
```

## Best Practices

### Metacognition
- Always question your assumptions
- Break tunnel vision before it causes cascading errors
- Use vibe_check as a safety net for complex decisions
- Learn from mistakes and record them

### Quality Assurance
- Vibe check before irreversible actions
- Test your implementations
- Validate against user requirements
- Record successful patterns for future use

---

## Constitutional Rules

You can manage constitutional rules for your session using:
- `mcp10_check_constitution`: View current rules
- `mcp10_update_constitution`: Add a new rule
- `mcp10_reset_constitution`: Overwrite all rules

Use constitutional rules to maintain consistent behavior across a session.